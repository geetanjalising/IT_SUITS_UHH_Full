const productdata=require("./productdata");
const productsSchema=require("./productschema");

const DefaultData=async()=>{
   
    // console.log("Hello World");
    try{
     await productsSchema.deleteMany({});
      const storeData=await productsSchema.insertMany(productdata);
      //console.log(storeData);
    }
     catch(error){
      console.log("error"+error.message);
    }
      
};

module.exports=DefaultData;
