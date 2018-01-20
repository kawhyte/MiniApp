using System;
using Microsoft.AspNetCore.Http;

namespace DTG.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicatinError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime dateOfBirth)
        {
            var age = DateTime.Today.Year - dateOfBirth.Year;

            if (dateOfBirth.AddYears(age) > DateTime.Today)
                age--;

            return age;



            // DateTime today = DateTime.Today;

            // int months = today.Month - dateOfBirth.Month;
            // int years = today.Year - dateOfBirth.Year;

            // if (today.Day < dateOfBirth.Day)
            // {
            //     months--;
            // }

            // if (months < 0)
            // {
            //     years--;
            //     months += 12;
            // }

            // int days = (today - dateOfBirth.AddMonths((years * 12) + months)).Days;

            // // return string.Format("{0} year{1}, {2} month{3} and {4} day{5}",
            // //                      years, (years == 1) ? "" : "s",
            // //                      months, (months == 1) ? "" : "s",
            // //                      days, (days == 1) ? "" : "s");
        }
    }
}