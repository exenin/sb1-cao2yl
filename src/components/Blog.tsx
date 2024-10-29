import React from 'react';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'The Future of Cybersecurity in 2024',
    excerpt: 'Explore emerging trends and technologies shaping the cybersecurity landscape.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    date: 'Mar 15, 2024',
    author: 'John Smith'
  },
  {
    title: 'Cloud Migration Best Practices',
    excerpt: 'Essential strategies for a successful cloud migration journey.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    date: 'Mar 12, 2024',
    author: 'Sarah Johnson'
  },
  {
    title: 'AI in Cybersecurity',
    excerpt: 'How artificial intelligence is revolutionizing threat detection and response.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80',
    date: 'Mar 10, 2024',
    author: 'Mike Wilson'
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Insights</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in cybersecurity and digital transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-400 mb-2">
                  {post.date} • {post.author}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {post.excerpt}
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-cyan-500 hover:text-cyan-400"
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-cyan-500 hover:bg-cyan-400 transition-colors duration-300"
          >
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}