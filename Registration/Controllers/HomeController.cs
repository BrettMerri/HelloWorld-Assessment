using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Registration.Models;
using System.Text.RegularExpressions;

namespace Registration.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<US_State> statesList = StateArray.ToList(); //Gets list of states for the Select list in the view
            ViewBag.StatesList = statesList;

            return View();
        }

        [HttpPost]
        public ActionResult Register(string firstName, string lastName, string address1,
            string address2, string city, string state, string zipcode, string country)
        {
            List<string> statesList = StateArray.Abbreviations(); //Gets list of state abbreviations

            //Matches all alphanumeric characters, spaces, periods, and dashes.
            Regex alphanumeric = new Regex(@"^[\w .-]*$", RegexOptions.IgnoreCase);

            //First name
            if (string.IsNullOrWhiteSpace(firstName) ||
                firstName.Length > 50 ||
                !alphanumeric.IsMatch(firstName))
            {
                ViewBag.ErrorMessage = $"Invalid first name: {firstName}";
                return View("Error");
            }

            //Last name
            if (string.IsNullOrWhiteSpace(lastName) ||
                lastName.Length > 50 ||
                !alphanumeric.IsMatch(lastName))
            {
                ViewBag.ErrorMessage = $"Invalid last name: {lastName}";
                return View("Error");
            }

            //Address1
            if (string.IsNullOrWhiteSpace(address1) ||
                address1.Length > 100 ||
                !alphanumeric.IsMatch(address1))
            {
                ViewBag.ErrorMessage = $"Invalid address1: {address1}";
                return View("Error");
            }

            //Address2 (optional)
            if (address2.Length > 100 ||
                !alphanumeric.IsMatch(address2))
            {
                ViewBag.ErrorMessage = $"Invalid address2: {address2}";
                return View("Error");
            }
            //Set address2 to null if empty
            if (string.IsNullOrWhiteSpace(address2))
                address2 = null;

            //City
            if (string.IsNullOrWhiteSpace(city) ||
                city.Length > 50 ||
                !alphanumeric.IsMatch(city))
            {
                ViewBag.ErrorMessage = $"Invalid city: {city}";
                return View("Error");
            }

            //State
            if (string.IsNullOrWhiteSpace(state) ||
            state.Length != 2 ||
            !statesList.Contains(state))
            {
                ViewBag.ErrorMessage = $"Invalid state: {state}";
                return View("Error");
            }

            //Zipcode
            if (string.IsNullOrWhiteSpace(zipcode) ||
                zipcode.Length != 5 ||
                !zipcode.All(char.IsDigit))
            {
                ViewBag.ErrorMessage = $"Invalid zipcode: {zipcode}";
                return View("Error");
            }

            try
            {
                BrettMerrifieldHelloWorldEntities db = new BrettMerrifieldHelloWorldEntities();

                User newUser = new User()
                {
                    FirstName = firstName,
                    LastName = lastName,
                    Address1 = address1,
                    Address2 = address2,
                    City = city,
                    State = state,
                    Zipcode = int.Parse(zipcode), //Should be all digits so TryParse is not needed
                    Country = "US", //There is no way to register without being from the US
                    DateTime = DateTime.Now
                };

                db.Users.Add(newUser);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMessage = $"Error saving to database. {ex.ToString()}";
                return View("Error");
            }

            return RedirectToAction("Confirmation");
        }

        public ActionResult Confirmation()
        {
            return View();
        }

        public ActionResult Admin()
        {
            BrettMerrifieldHelloWorldEntities db = new BrettMerrifieldHelloWorldEntities();
            List<User> userList = db.Users.OrderByDescending(x => x.DateTime).ToList();
            return View(userList);
        }
    }
}