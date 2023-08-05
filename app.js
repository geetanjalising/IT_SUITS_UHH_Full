require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 8007;


const cors = require("cors");
// app.use(cors());
app.use("*", cors({
  origin: true,
  credentials: true
}));

app.listen(port, () => {
  console.log(`server is running on ${port}`);
})




//database connection
const mongoose = require("mongoose")
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => console.log("data base connected")).catch((error) => console.log("error" + error.message));

const Products = require("./Products/productschema");

const DefaultData = require("./Products/defaultdata")
DefaultData();

app.use(express.json());



//Routing
app.get("/getallproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("console the data"+productsdata);
    res.status(201).json(productsdata);
  }
  catch (error) {
    console.log("error" + error.maeesage);
  }

})

app.get("/getoneproductdata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const isproduct = await Products.findOne({ id: id });
    res.status(201).json(isproduct);
  }
  catch (error) {

    console.log("error" + error.message);
  }
})

const USER = require("./User/userschema");

app.post("/register", async (req, res) => {
  //console.log(req.body);
  const { fname, email, mobile, password, cpassword, address, pincode } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword || !address || !pincode) {
    res.status(422).json({ error: "fill all the data" });
    console.log("not data available");
  };

  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "this user is already present" })
    }
    else if (password !== cpassword) {
      res.status(422).json({ error: "password and cpassword not match" })
    }
    else {
      const finaluser = new USER({
        fname, email, mobile, password, cpassword, address, pincode
      });

      //password hashing process goes here
      //console.log("final"+finaluser); 
      const storedata = await finaluser.save();
      //res.status(222).json({ error: "pasdfghjj t gygh u tch" })
      //  console.log("DFDFF"+storedata);
      res.status(201).json(storedata);

    }
  }
  catch (error) {
    console.log("error the bhai catch ma for registratoin time" + error.message);
    res.status(422).send(error);
  }
});

const bcrypt = require("bcryptjs");

//const cookieParser = require("cookie-parser");
//app.use(cookieParser());

const jwt = require("jsonwebtoken");
const secretKey = process.env.KEY;

app.post("/signin", async (req, res) => {
  //console.log("Helli")
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "fill all the data" })
  };
  try {

    const userlogin = await USER.findOne({ email: email });
    //console.log(userlogin);
    if (userlogin) {

      const isMatch = await bcrypt.compare(password, userlogin.password);
      // console.log(isMatch + " password match ");


      if (!isMatch) {

        res.status(400).json({ error: "invalid details" })

      }
      else {
        console.log(email + " FFFVF " + userlogin.email)
        //const token = await userlogin.generateAuthtoken();
        //console.log("token from backened sign in"+token);
        const token1 = jwt.sign({ email: userlogin.email }, secretKey, { expiresIn: 99999999 });
        //console.log("TOKEN->_>_>_>"+token);

        // res.cookie("Amazonweb", token, {
        //   expires: new Date(Date.now() + 5999999999),
        //   httpOnly: true
        // }).json({
        //   status: "Ok", data: token1
        // })

        res.status(201).json({ status: "ok", data: token1 });
        //res.send({status:"ok",data:token1});
        // res.status(201).json({ userlogin })
      }
    } else {
      res.status(400).json({ error: "invalid details" });
    }
  }
  catch (error) {
    res.status(400).json({ error: "invalid details" })
  }
})

//const authenticate = require("./middleware/authenticate");

app.post("/addcart/:id", async (req, res) => {
  const { token, email } = req.body;
  //console.log(token); 
  try {
    //console.log("before1");
    const { id } = req.params;

    //console.log("ID AT ADDCART"+id);
    const cart = await Products.findOne({ id: id });
    // console.log(cart + "cart value");

    const user = jwt.verify(token, secretKey, (err, res) => {
      //console.log("VErification-----enter");
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    const UserContact = await USER.findOne({ email: useremail });
    //  console.log("UserconTACT  ->"+UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart);

      await UserContact.save();
      // console.log(cartData);
      res.status(201).json(UserContact);
      //console.log("Usercontact valid");
    }
    else {
      res.status(401).json({ error: "invalid user1" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user2" });

  }
})

app.post("/cartdetails", async (req, res) => {
  //console.log("router pr a gya");
  const { token } = req.body;
  try {
    const user = jwt.verify(token, secretKey, (err, res) => {
      //console.log("VErification-----enter");
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    // console.log("try pr a gya");
    const buyuser = await USER.findOne({ email: useremail });
    //console.log(buyuser + "user hain buy pr");
    await buyuser.save();
    res.status(201).json(buyuser);
    //console.log("buyuser pr a gya");
  } catch (error) {
    console.log(error + "error for buynow");
  }
})

app.post("/validuser", async (req, res) => {
  const { token } = req.body;
  console.log("entered in valid router")
  try {
    const user = jwt.verify(token, secretKey, (err, res) => {
      //console.log("VErification-----enter");
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    const validuser = await USER.findOne({ email: useremail });
    //  console.log("validuser->" + validuser);
    res.status(201).json(validuser);
  } catch (error) {
    console.log(error + "in validuser");
  }
})

app.delete("/remove/:id", async (req, res) => {
  const { token } = req.body;
  //console.log(token);
  try {
    const { id } = req.params;
    const user = jwt.verify(token, secretKey, (err, res) => {
      //console.log("VErification-----enter");
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    console.log(user);
    const useremail = user.email;
    //  const itemToDelete = await Products.findOne({ id: id });
    //console.log(itemToDelete);
    const account = await USER.findOne({ email: useremail });
    //console.log(account.carts);
    account.carts = account.carts.filter((currval) => {
      //  console.log(currval.id+"   "+id);
      //  if(currval.id!=id)
      //   console.log("flag");
      return currval.id != id;
    });

    account.save();
    res.status(201).json(account);
    // console.log("item remove");
  } catch (error) {
    //console.log(error + "error");
    res.status(400).json(error);
  }
})

app.get("/logout", async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token
    });

    res.clearCookie("Amazonweb", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    console.log("user logout");

  } catch (error) {
    console.log(error + "jwt provide then logout");
  }
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  // console.log("HELLO");
  // console.log("TOKEN" + token);
  try {
    // console.log("VErification--not---enter");
    // console.log(token);
    // console.log("******************");
    // console.log(secretKey); 
    const user = jwt.verify(token, secretKey, (err, res) => {
      //console.log("VErification-----enter");
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    const useremail = user.email;
    USER.findOne({ email: useremail })
      .then((data) => {
        //console.log("user--------------------------------found")
        res.send({ status: "ok", data: data })
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.send({ status: "error at first" });
  }
});
app.post("/addreview/:id", async (req, res) => {
  console.log("review hello");
  const { reviewdata, name } = req.body;
  console.log(reviewdata);
  try {
    const { id } = req.params;
    console.log(id);
    const isproduct = await Products.findOne({ id: id });
    const newreview = {
      name: name,
      review: reviewdata.review
    }
    //  reviewdata=reviewdata.concat(name);
    // console.log("Reviewdata here----->");
    //  console.log(newreview);
    //  console.log("newreview");
    console.log(isproduct);
    // const addreview=await isproduct.addnewreview(newreview);
    //console.log(addreview);
    if (isproduct) {
      isproduct.review.push(newreview);
      await isproduct.save();
      // try {
      // await Products.updateOne(
      //   {
      //     id:id,   
      //   },
      //   {
      //     $set:{ 
      //      addreview
      //     },
      //   }     
      // )     
      // res.send({status:"ok",score});
      // } catch (error) { 
      //   console.log(error); 
      //   res.json({ status: "Something Went Wrong" });
      // }  
      //   await isproduct.save();
      // await Products.save();
      console.log("Reviewdata added----->");
      console.log(isproduct);
      res.status(201).json(isproduct);
    }
    else {
      res.status(401).json({ error: "invalid user1" });
    }
  }
  catch (error) {

    console.log("error" + error.message);
  }
})

app.get("/getAllUser", async (req, res) => {
  // const {userid}=req.body;
  try {
    const allUser = await USER.find({});
    res.send({ status: "ok", data: allUser })
  } catch (error) {
    console.log(error);
  }
})

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  //console.log("start");
  try {
    //console.log("done");
    USER.deleteOne({ _id: userid }).then(result => {
      console.log(result)
    });
    res.send({ status: "ok", data: "Deleted" });
  }
  catch (error) {
    console.log("not done");
    console.log(error);
  }
});

app.delete("/removeItembyAdmin/:id", async (req, res) => {
  const { email } = req.body;
  try {
    const { id } = req.params;
    //  console.log(id);
    //  const itemToDelete = await Products.findOne({ id: id });
    //console.log(itemToDelete);
    //const user=await USER.find();
    //console.log(user);
    const account = await USER.findOne({ email: email });
    // console.log(account);
    //console.log(account.carts);
    account.carts = account.carts.filter((currval) => {
      //console.log(currval.id+"   "+id);
      //  if(currval.id!=id)
      //   console.log("flag");
      return currval.id != id;
    });

    account.save();
    // user.save();  
    res.status(201).json(account);
    // console.log("item remove");
  } catch (error) {
    console.log(error + "error");
    res.status(400).json(error);
  }
});
