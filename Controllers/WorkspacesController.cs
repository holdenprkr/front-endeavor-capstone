using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Front_Endeavor.Data;
using Front_Endeavor.Models;
using Front_Endeavor.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult> Details(int id, string searchString, [FromRoute]string userId)
        {
            try
            {
                //Find the workspace matching the id passed in
                var workspace = await _context.Workspace
                    .FirstOrDefaultAsync(w => w.Id == id);
                
                //Build a WorkspaceViewModel
                var workspaceViewModel = new WorkspaceViewModel()
                {
                    Id = id,
                    Name = workspace.Name,
                    Color1 = workspace.Color1,
                    Color2 = workspace.Color2,
                    Color3 = workspace.Color3
                };

                if (!String.IsNullOrEmpty(workspace.Description))
                {
                    workspaceViewModel.Description = workspace.Description;
                }

                if (!String.IsNullOrEmpty(workspace.GithubRepo))
                {
                    workspaceViewModel.GithubRepo = workspace.GithubRepo;
                }

                if (!String.IsNullOrEmpty(workspace.DataRelatDiagram))
                {
                    workspaceViewModel.DataRelatDiagram = workspace.DataRelatDiagram;
                }

                if (!String.IsNullOrEmpty(workspace.MockupDiagram))
                {
                    workspaceViewModel.MockupDiagram = workspace.MockupDiagram;
                }

                //Get a list of UserWorkspaces that are a part of the workspace and add to the view model
                workspaceViewModel.UserWorkspaces = await _context.UserWorkspace
                    .Where(uw => uw.WorkspaceId == id)
                    .Include(uw => uw.ApplicationUser)
                    .ToListAsync();

                if (!String.IsNullOrEmpty(userId))
                {
                    var userWorkspace = new UserWorkspace
                    {
                        ApplicationUserId = userId,
                        WorkspaceId = id,
                        DevLead = false
                    };

                    workspaceViewModel.UserWorkspaces.Add(userWorkspace);
                }

                var user = await GetCurrentUserAsync();

                var allUsers = await _context.ApplicationUser.ToListAsync();

                var teamMemberIds = workspaceViewModel.UserWorkspaces.Select(uw => uw.ApplicationUserId).ToArray();

                //Store search results in SearchResults list of app users
                if (!String.IsNullOrEmpty(searchString))
                {
                    workspaceViewModel.SearchResults = allUsers
                        .Where(au => au.Id != user.Id)
                        .Where(au => !teamMemberIds.Contains(au.Id))
                        .Where(au => au.Email.Contains(searchString)).ToList();
                }
                else
                {
                    workspaceViewModel.SearchResults = new List<ApplicationUser>();
                }

                //Get a list of all the posts made in the workspace
                //Build a list of PostViewModels and add to the view model
                workspaceViewModel.Posts = await _context.Post
                    .Where(p => p.WorkspaceId == id)
                    .Include(p => p.ApplicationUser)
                    .Select(p => new PostViewModel()
                    {
                        Id = p.Id,
                        Text = p.Text,
                        ImageFile = p.ImageFile,
                        Link = p.Link,
                        ApplicationUserId = p.ApplicationUserId,
                        ApplicationUser = p.ApplicationUser,
                        Timestamp = p.Timestamp,
                        Pinned = p.Pinned,
                        Comments = _context.Comment.Where(c => c.PostId == p.Id).Include(c => c.ApplicationUser).OrderBy(c => c.Timestamp).ToList(),
                        Likes = _context.Like.Where(l => l.PostId == p.Id).ToList()
                    }).ToListAsync();

                return View(workspaceViewModel);
            }
            catch (Exception ex)
            {
                return View();
            }
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
                    Name = workspace.Name,
                    Color1 = workspace.Color1,
                    Color2 = workspace.Color2,
                    Color3 = workspace.Color3
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
                
                return RedirectToAction("Details", new { id = newWorkspace.Id });
            }
            catch
            {
                return View();
            }
        }

        // GET: Workspaces/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            var workspace = await _context.Workspace
                .FirstOrDefaultAsync(w => w.Id == id);

            return View(workspace);
        }

        // POST: Workspaces/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(int id, Workspace workspace)
        {
            try
            {
                var workspaceInstance = new Workspace()
                {
                    Id = id,
                    Name = workspace.Name,
                    Color1 = workspace.Color1,
                    Color2 = workspace.Color2,
                    Color3 = workspace.Color3
                };

                if (!String.IsNullOrEmpty(workspace.Description))
                {
                    workspaceInstance.Description = workspace.Description;
                }

                if (!String.IsNullOrEmpty(workspace.GithubRepo))
                {
                    workspaceInstance.GithubRepo = workspace.GithubRepo;
                }

                if (!String.IsNullOrEmpty(workspace.DataRelatDiagram))
                {
                    workspaceInstance.DataRelatDiagram = workspace.DataRelatDiagram;
                }

                if (!String.IsNullOrEmpty(workspace.MockupDiagram))
                {
                    workspaceInstance.MockupDiagram = workspace.MockupDiagram;
                }

                _context.Workspace.Update(workspaceInstance);
                await _context.SaveChangesAsync();

                return RedirectToAction("Details", new { id = workspaceInstance.Id });
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