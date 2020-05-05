using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Front_Endeavor.Data;
using Front_Endeavor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Front_Endeavor.Controllers
{
    public class UserWorkspacesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserWorkspacesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: UserWorkspaces
        public ActionResult Index()
        {
            return View();
        }

        // GET: UserWorkspaces/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UserWorkspaces/Create
        public async Task<ActionResult> Create(string searchString)
        {
            var allUsers = await _context.ApplicationUser.ToListAsync();
            
            if (!String.IsNullOrEmpty(searchString))
            {
                allUsers = allUsers.Where(au => au.Email.Contains(searchString)).ToList();
            }
            
            return NoContent();
        }

        // POST: UserWorkspaces/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: UserWorkspaces/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UserWorkspaces/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: UserWorkspaces/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: UserWorkspaces/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}