// Handle Navbar Toggle for Small Screens
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Handle Blog Generation
document.getElementById('blog-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const topic = document.getElementById('topic').value;

    // Show "Generating..." while waiting for the response
    document.getElementById('blog-content').innerText = 'Generating...';

    // Send blog topic via POST request to your AWS endpoint
    fetch('https://p9cefdi2aj.execute-api.us-east-1.amazonaws.com/dev/bloggeneration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            blog_topic: topic // Send topic as JSON
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Clean the unnecessary tags from the generated blog content
        const cleanedContent = data.blog.replace(/(\[.*?\])/g, '').replace(/\\n|\\t/g, '');
        document.getElementById('blog-content').innerHTML = cleanedContent;
    })
    .catch(error => {
        console.error('Error generating blog:', error);
        document.getElementById('blog-content').innerText = 'Failed to generate blog.';
    });
});


document.getElementById('copy-button').addEventListener('click', function() {
    const blogContent = document.getElementById('blog-content').innerText;
    
    if (blogContent && blogContent !== 'No blog generated yet.') {
        navigator.clipboard.writeText(blogContent)
            .then(() => {
                alert('Blog content copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    } else {
        alert('No blog content to copy.');
    }
});


