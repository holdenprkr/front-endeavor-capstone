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
using Microsoft.EntityFrameworkCore;

namespace Front_Endeavor.Controllers
{
    public class CommentsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public CommentsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        // GET: Comments
        public ActionResult Index()
        {
            return View();
        }

        // GET: Comments/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Comments/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Comments/Create
        [HttpPost]
        public async Task<ActionResult> Create(Comment comment)
        {
            try
            {
                var user = await GetCurrentUserAsync();

                var commentInstance = new Comment()
                {
                    ApplicationUserId = user.Id,
                    PostId = comment.PostId,
                    Timestamp = DateTime.Now,
                    Text = comment.Text
                };

                _context.Comment.Add(commentInstance);
                await _context.SaveChangesAsync();

                var post = await _context.Post
                    .FirstOrDefaultAsync(p => p.Id == comment.PostId);

                var workspace = await _context.Workspace
                    .FirstOrDefaultAsync(w => w.Id == post.WorkspaceId);

                var commentResponse = new CommentResponseViewModel()
                {
                    Id = commentInstance.Id,
                    Text = commentInstance.Text,
                    PostId = commentInstance.PostId,
                    Timestamp = commentInstance.Timestamp,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Color1 = workspace.Color1,
                    Color2 = workspace.Color2,
                    Color3 = workspace.Color3
                };

                return Ok(commentResponse);
            }
            catch
            {
                return View();
            }
        }

        // GET: Comments/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Comments/Edit/5
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

        // POST: Comments/Delete/5
        [HttpPost]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var comment = _context.Comment.FirstOrDefault(c => c.Id == id);
                _context.Comment.Remove(comment);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch
            {
                return NoContent();
            }
        }

        private Task<ApplicationUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}