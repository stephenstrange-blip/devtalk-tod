const { getMessages } = require("../db/database");

exports.get = async (req, res) => {
  if (!res.locals.currentUser) return res.redirect("/");
  try {
    const { rows } = await getMessages();
    rows.forEach((row) => {
      row.date = handleDate(row.date);
    });
    res
      .status(200)
      .render("welcome", { role: res.locals.currentRole, messages: rows });
  } catch (err) {
    console.log(err);
    res.redirect("/welcome");
  }
};

function handleDate(value) {
  const arr = value.split(",");
  const date = {
    day_name: arr[0],
    DD: arr[1],
    Month: arr[2],
    Year: arr[3],
  };
  return date;
}
