import express from "express";
import Moralis from "moralis";
import dotenv from "dotenv";
import cors from "cors";
import { Query } from "@angular/core";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

app.get("/getwalletbalance", async (req,res) => {
    try{
        const { query}=req;
        const response = await Moralis.EvmApi.balance.getNativeBalance({
            chain: "0xaa36a7",
            address: query.address,
        });
        return res.status(200).json(response);
    } catch (e){
        console.log(`Something went wrong ${e}`);
        return res.status(400).json();
    }
});

Moralis.start({
    apiKey: MORALIS_API_KEY,
}).then(()=>{
    app.listen(port,()=>{
        console.log(`Listening for API Calls on ${port}`);
    });
});