document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navbarList = document.getElementById('navbar__list');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const createPostBtn = document.getElementById('createPostBtn');
    const backToPostsBtn = document.getElementById('backToPostsBtn');
    const postForm = document.getElementById('postForm');
    const postsContainer = document.getElementById('postsContainer');

    const blogListSection = document.getElementById('blogList');
    const createPostSection = document.getElementById('createPost');
    const viewPostSection = document.getElementById('viewPost');
    const postTitleElement = document.getElementById('postTitle');
    const postContentElement = document.getElementById('postContent');

    // Simulate blog posts (you can later replace this with API calls)
    let posts = [
        { id: 1, title: "First Blog Post", content: "This is the content of the first blog post." },
        { id: 2, title: "Second Blog Post", content: "This is the content of the second blog post." },
    ];

    // Navigation Component
    const NavComponent = () => {
        const buildNav = () => {
            sections.forEach(section => {
                const sectionID = section.getAttribute('id');
                const sectionName = section.getAttribute('data-nav') || sectionID;

                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionName}</a>`;
                navbarList.appendChild(listItem);
            });
        };

        const enableSmoothScroll = () => {
            navbarList.addEventListener('click', (event) => {
                event.preventDefault();
                if (event.target.classList.contains('menu__link')) {
                    const targetID = event.target.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetID);
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        };

        return { buildNav, enableSmoothScroll };
    };

    // Blog Post Component
    const BlogComponent = () => {
        const renderPosts = () => {
            postsContainer.innerHTML = ''; // Clear previous posts
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post-preview');
                postDiv.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content.substring(0, 100)}...</p>
                    <button class="viewPostBtn" data-id="${post.id}">Read More</button>
                `;
                postsContainer.appendChild(postDiv);
            });
            setupViewPostButtons();
        };

        const createPost = (title, content) => {
            const newPost = { id: posts.length + 1, title, content };
            posts.push(newPost);
            renderPosts();
        };

        const viewPost = (id) => {
            const post = posts.find(p => p.id === Number(id));
            postTitleElement.textContent = post.title;
            postContentElement.textContent = post.content;

            blogListSection.classList.add('hidden');
            viewPostSection.classList.remove('hidden');
        };

        const setupViewPostButtons = () => {
            document.querySelectorAll('.viewPostBtn').forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const postId = event.target.getAttribute('data-id');
                    viewPost(postId);
                });
            });
        };

        return { renderPosts, createPost };
    };

    // Instantiate Components
    const navComponent = NavComponent();
    const blogComponent = BlogComponent();

    // Initialize functionality
    navComponent.buildNav();
    navComponent.enableSmoothScroll();
    blogComponent.renderPosts();

    // Event Listeners
    createPostBtn.addEventListener('click', () => {
        blogListSection.classList.add('hidden');
        createPostSection.classList.remove('hidden');
    });

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        blogComponent.createPost(title, content);
        createPostSection.classList.add('hidden');
        blogListSection.classList.remove('hidden');
        postForm.reset();
    });

    backToPostsBtn.addEventListener('click', () => {
        viewPostSection.classList.add('hidden');
        blogListSection.classList.remove('hidden');
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('hidden');
        } else {
            scrollToTopBtn.classList.add('hidden');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
