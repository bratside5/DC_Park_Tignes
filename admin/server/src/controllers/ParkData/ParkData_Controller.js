const express = require("express");
const ParkSignIn = require("../../models/ParkData/ParkDataModel");
const mdq = require("mongo-date-query");

async function park_today(req, res) {
  try {
    const park = await ParkSignIn.find({ createdAt: mdq.today() });
    if (!park) {
      return res.send({ message: "No park Data" });
    }
    return res.send(park);
  } catch (error) {
    res.status(404);
    return res.send({ error: "park Data does not exist!" });
  }
}
async function park_yesterday(req, res) {
  try {
    const park = await ParkSignIn.find({ createdAt: mdq.yesterday() });
    if (!park) {
      return res.send({ message: "No park Data" });
    }
    return res.send(park);
  } catch (error) {
    res.status(404);
    return res.send({ error: "park Data does not exist!" });
  }
}

async function park_last_week(req, res) {
  try {
    const park = await ParkSignIn.find({ createdAt: mdq.lastWeek() });
    if (!park) {
      return res.send({ message: "No park Data" });
    }
    return res.send(park);
  } catch (error) {
    res.status(404);
    return res.send({ error: "park Data does not exist!" });
  }
}

// options = {}
// # eg. api/v1/meals?date=Tue+Jan+13+2015+00%3A00%3A00+GMT%2B0100+(CET)
// if req.query.date?
//   date = new Date req.query.date
//   date.setHours 0, 0, 0, 0
//   endDate = new Date date
//   endDate.setHours 23, 59, 59, 59
//   options.date =
//     $lt: endDate
//     $gte: date

async function park_dates_between(req, res) {
  // }
  try {
    let { startDate, endDate } = req.query;
    if (startDate === undefined || endDate === undefined) {
      return res.status(400).json({
        status: "failure",
        message: "Please ensure you pick two dates",
      });
    }
    console.log({ startDate, endDate });
    const datesBetween = await ParkSignIn.find({
      createdAt: {
        $gte: new Date(req.query.startDate),
        $lt: new Date(req.query.endDate),
      },
    }).sort({ createdAt: "asc" });
    if (!datesBetween) {
      return res.status(404).json({
        status: "failure",
        message: "Could not retrieve date",
      });
    }
    // console.log({ datesBetween });
    return res.status(500).json({
      status: "success",
      message: `You have chosen ${startDate} & ${endDate}`,
      data: datesBetween,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: "Please ensure you pick two dates",
    });
  }
}

module.exports = {
  park_today,
  park_yesterday,
  park_last_week,
  park_dates_between,
};
