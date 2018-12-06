// import model
const List = require("../models/List");

const formatResponse = (status, data, message = "") => {
  return {
    status: status,
    data: data,
    message: message
  };
};

exports.get_all_lists = (req, res) => {
  List.find((err, lists) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(formatResponse("success", lists));
  });
};

exports.create_list = (req, res) => {
  const list = new List(req.body);
  list
    .save()
    .then(list => {
      res.status(201).json(formatResponse("success", list));
    })
    .catch(err => {
      console.log(err);
    });
};

exports.get_single_list = (req, res) => {
  List.findById({ _id: req.params.listId }, (err, list) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).json(formatResponse("success", list));
  });
};

exports.delete_list = (req, res) => {
  List.findByIdAndDelete({ _id: req.params.listId }, err => {
    if (err) {
      return console.log(err);
    }
    res
      .status(200)
      .json(
        formatResponse("success", null, "List successfully deleted from DB.")
      );
  });
};

exports.add_spot_to_list = (req, res) => {
  List.findByIdAndUpdate(
    { _id: req.params.listId },
    { $push: { spots: { _id: req.params.spotId, name: req.body.name } } },
    err => {
      if (err) {
        return console.log(err);
      }
      res
        .status(200)
        .json(
          formatResponse(
            "success",
            null,
            `Spot successfully added to list ${req.params.listId}`
          )
        );
    }
  );
};

exports.delete_spot_from_list = (req, res) => {
  List.findByIdAndUpdate(
    { _id: req.params.listId },
    { $pull: { spots: { _id: req.params.spotId } } },
    err => {
      if (err) {
        return console.log(err);
      }
      res
        .status(200)
        .json(
          formatResponse(
            "success",
            null,
            `Spot successfully removed from list ${req.params.listId}`
          )
        );
    }
  );
};
