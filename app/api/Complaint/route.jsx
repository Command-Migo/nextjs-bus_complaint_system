import connectDB from "@/app/lib/mongodb";
import Complaint from "@/app/models/Complaint";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
    const { fullname, email, busNumber,tripNumber,complaint } = await req.json();
  
    try {
      await connectDB();
      await Complaint.create({ fullname,email,busNumber,tripNumber,complaint });
  
      return NextResponse.json({
        msg: ["Complaint sent successfully"],
        success: true,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        let errorList = [];
        for (let e in error.errors) {
          errorList.push(error.errors[e].message);
        }
        console.log(errorList);
        return NextResponse.json({ msg: errorList });
      } else {
        return NextResponse.json({ msg: ["Unable to send message."] });
      }
    }
  }