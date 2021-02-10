const express = require("express");
const ParkSignIn = require("../../models/SignIn/ParkSignIn");

async function park_index(req, res) {
  try {
    const park = await ParkSignIn.find();
    if (!park) {
      return res.send({ message: "No park Data" });
    }
    return res.send(park);
  } catch (error) {
    res.status(404);
    return res.send({ error: "park Data does not exist!" });
  }
}

async function park_latest(req, res) {
  try {
    const parkLatest = await ParkSignIn.findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    if (!parkLatest) {
      return res.send({ message: "No park" });
    }
    return res.send(parkLatest);
  } catch (error) {
    res.status(404);
    return res.send({ error: "park Latest doesn't exist!" });
  }
}

async function park_details(req, res) {
  const _id = req.params.id;
  try {
    const parkID = await ParkSignIn.findById({ _id });
    if (!parkID) {
      return res.send({ message: "No park ID" });
    }
    return res.status(200).send(parkID);
  } catch (error) {
    res.status(404);
    return res.send({ error: "park ID doesn't exist!" });
  }
}

async function park_create_post(req, res) {
  const newpark = new ParkSignIn({
    first_name: req.body.first_name,
    second_name: req.body.second_name,
    email: req.body.email,
    instagram: req.body.instagram,
    isRegistered: req.body.isRegistered,
    date: req.body.date,
  });
  try {
    console.log(newpark);
    await newpark.save();
    if (!newpark) {
      res.send({ message: "Cannot Save park to Database" });
    } else res.send(newpark);
  } catch (error) {
    res.status(404);
    res.send({ error: "park doesn't exist!" });
  }
}

async function park_delete(req, res) {
  try {
    const deletepark = await ParkSignIn.deleteOne({ _id: req.params.id });
    if (!deletepark) {
      return res.send({ message: "No park ID to delete" });
    }
    res.status(204);
    return res.send({ message: "park Deleted" });
  } catch {
    res.status(404);
    return res.send({ error: "park doesn't exist!" });
  }
}

module.exports = {
  park_index,
  park_details,
  park_latest,
  park_create_post,
  park_delete,
};
