using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Front_Endeavor.Data;
using Front_Endeavor.Models;
using Front_Endeavor.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Front_Endeavor.Controllers
{
    public class PostsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public PostsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: Posts
        public ActionResult Index()
        {
            return View();
        }

        // GET: Posts/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Posts/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Posts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(PostViewModel postViewModel)
        {
            try
            {
                var user = await GetCurrentUserAsync();

                var postInstance = new Post
                {
                    Text = postViewModel.Text,
                    ApplicationUserId = user.Id,
                    WorkspaceId = postViewModel.WorkspaceId,
                    Timestamp = DateTime.Now,
                    Pinned = false
                };

                if (!String.IsNullOrEmpty(postViewModel.Link))
                {
                    postInstance.Link = postViewModel.Link;
                }

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\images");
                if (postViewModel.Image != null)
                {
                    var fileName = Guid.NewGuid().ToString() + postViewModel.Image.FileName;
                    postInstance.ImageFile = fileName;
                    using (var fileStream = new FileStream(Path.Combine(uploadPath, fileName), FileMode.Create))
                    {
                        await postViewModel.Image.CopyToAsync(fileStream);
                    }
                }

                _context.Post.Add(postInstance);
                await _context.SaveChangesAsync();

                return RedirectToAction("Details", "Workspaces", new { id = postViewModel.WorkspaceId });
            }
            catch
            {
                return View();
            }
        }

        // GET: Posts/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Posts/Edit/5
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

        // POST: Posts/Delete/5
        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var post = _context.Post.FirstOrDefault(p => p.Id == id);
                _context.Post.Remove(post);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch
            {
                return View();
            }
        }
        
        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}