document.addEventListener('DOMContentLoaded', function() {
    const blogForm = document.getElementById('blogForm');
    const blogList = document.getElementById('blogList');

    // Load existing posts from local storage
    loadPosts();

    // Add event listener for form submission
    blogForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const titleInput = document.getElementById('titleInput');
        const contentInput = document.getElementById('contentInput');

        const post = {
            title: titleInput.value,
            content: contentInput.value,
            id: Date.now()
        };

        savePost(post);
        titleInput.value = '';
        contentInput.value = '';
    });

    function savePost(post) {
        // Get existing posts from local storage
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts(posts);
    }

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        displayPosts(posts);
    }

    function displayPosts(posts) {
        blogList.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'bg-white p-5 mb-5 rounded shadow';
            postDiv.innerHTML = `
                <h2 class="font-bold text-xl">${post.title}</h2>
                <p class="text-gray-700">${post.content}</p>
                <button class="bg-red-600 text-white p-1 rounded mt-2" onclick="deletePost(${post.id})">Delete</button>
            `;
            blogList.appendChild(postDiv);
        });
    }

    window.deletePost = function(id) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts(posts);
    }
});
