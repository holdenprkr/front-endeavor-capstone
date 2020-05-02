using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Front_Endeavor.Data;
using Front_Endeavor.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Front_Endeavor.Controllers
{
    public class WorkspacesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public WorkspacesController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Workspaces
        public ActionResult Index()
        {
            return View();
        }

        // GET: Workspaces/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Workspaces/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Workspaces/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Workspace workspace)
        {
            try
            {

                //Creates new workspace object
                var newWorkspace = new Workspace
                {
                    Name = workspace.Name
                };

                if (!String.IsNullOrEmpty(workspace.Description))
                {
                    newWorkspace.Description = workspace.Description;
                }

                if (!String.IsNullOrEmpty(workspace.GithubRepo))
                {
                    newWorkspace.GithubRepo = workspace.GithubRepo;
                }

                if (!String.IsNullOrEmpty(workspace.DataRelatDiagram))
                {
                    newWorkspace.DataRelatDiagram = workspace.DataRelatDiagram;
                }
                
                if (!String.IsNullOrEmpty(workspace.MockupDiagram))
                {
                    newWorkspace.MockupDiagram = workspace.MockupDiagram;
                }
                
                if (!String.IsNullOrEmpty(workspace.Color1))
                {
                    newWorkspace.Color1 = workspace.Color1;
                }
                
                if (!String.IsNullOrEmpty(workspace.Color2))
                {
                    newWorkspace.Color2 = workspace.Color2;
                }
                
                if (!String.IsNullOrEmpty(workspace.Color3))
                {
                    newWorkspace.Color3 = workspace.Color3;
                }

                _context.Workspace.Add(newWorkspace);
                await _context.SaveChangesAsync();
                
                var user = await GetCurrentUserAsync();

                var userWorkspace = new UserWorkspace
                {
                    WorkspaceId = newWorkspace.Id,
                    ApplicationUserId = user.Id,
                    DevLead = true
                };

                _context.UserWorkspace.Add(userWorkspace);
                await _context.SaveChangesAsync();
                
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Workspaces/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Workspaces/Edit/5
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

        // GET: Workspaces/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Workspaces/Delete/5
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

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}