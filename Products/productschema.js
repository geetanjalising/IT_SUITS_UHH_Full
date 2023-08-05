const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    id:String,
    url:String,
    detailUrl:String,
    title:Object,
    price:Object, 
    description:String,
    discount:String,
    review:Array,
    tagline:String
})

//adding review
// productSchema.methods.addnewreview=async function(reviewdata){
//     try{
//         // console.log(this.review);
//         // console.log(reviewdata);
//         this.review=this.review.concat(reviewdata);
//         console.log("++++++++++++++++");
//        // console.log(this.review);
//         await this.save();
//       return this.review
      
//     }catch(error){
//         console.log(error);
//     }
// }

const Product=new mongoose.model("eCollection",productSchema);

module.exports=Product;