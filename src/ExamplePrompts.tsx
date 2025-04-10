import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ExamplePromptsProps {
  area: string;
  onBack: () => void;
}

const EXAMPLE_PROMPTS: Record<string, string[]> = {
  'Unit Testing': [
    'Create a comprehensive test suite for a user authentication system that handles login, registration, and password reset. Include tests for edge cases like invalid credentials, expired tokens, and rate limiting.',
    'Design unit tests for a shopping cart module that manages product additions, removals, quantity updates, and price calculations. Consider scenarios like discount applications and inventory constraints.',
    'Write tests for an email validation service that checks format, domain existence, and disposable email providers. Include cases for international domains and special characters.',
    'Develop a test suite for a caching mechanism that handles data expiration, cache invalidation, and concurrent access. Consider memory limits and race conditions.',
    'Create tests for a file upload service that validates file types, sizes, and metadata. Include security checks and error handling scenarios.',
    'Design unit tests for a payment processing module that handles different payment methods, currencies, and transaction states. Include fraud detection scenarios.'
  ],
  'API Development': [
    'Design a RESTful API for a social media platform with endpoints for user profiles, posts, comments, and likes. Include authentication, pagination, and rate limiting.',
    'Create an API specification for a real-time chat system with message delivery, read receipts, and user presence. Consider websocket integration.',
    'Develop an API for a task management system with projects, tasks, assignments, and deadlines. Include permission handling and notifications.',
    'Design a versioned API for an e-commerce platform with product catalog, cart management, and order processing. Include search and filtering capabilities.',
    'Create an API for a content management system with support for multiple content types, drafts, and publishing workflows.',
    'Design a GraphQL API for a music streaming service with playlists, favorites, and recommendations.'
  ],
  'Data Processing': [
    'Create a data pipeline to process large CSV files containing sales data, calculate metrics, and generate reports. Handle missing data and outliers.',
    'Design a system to analyze log files in real-time, detect patterns, and trigger alerts. Consider performance and storage optimization.',
    'Develop a script to process image datasets, extract metadata, and perform batch transformations. Include error handling and progress tracking.',
    'Create a data cleaning pipeline for customer records that standardizes formats, removes duplicates, and validates information.',
    'Design a system to process streaming sensor data, calculate moving averages, and detect anomalies.',
    'Develop a script to merge and reconcile data from multiple sources with different schemas and formats.'
  ],
  'CLI Applications': [
    'Create a CLI tool for managing Docker containers with commands for listing, starting, stopping, and monitoring resources.',
    'Design a command-line interface for a static site generator with build, serve, and deploy commands.',
    'Develop a CLI for managing git repositories with custom workflows and automated tasks.',
    'Create a command-line tool for processing and converting media files with various format options.',
    'Design a CLI for managing cloud resources across different providers with unified commands.',
    'Develop a task automation CLI with scheduling, logging, and notification features.'
  ],
  'Web Scraping': [
    'Create a scraper for e-commerce sites that extracts product details, prices, and reviews while respecting rate limits.',
    'Design a scraping system for news websites that captures articles, metadata, and related content.',
    'Develop a scraper for social media profiles that collects public information and engagement metrics.',
    'Create a scraping tool for real estate listings that captures property details and price history.',
    'Design a scraper for job boards that collects postings, requirements, and company information.',
    'Develop a system to monitor and scrape competitor websites for price and product changes.'
  ],
  'Task Automation': [
    'Create an automation script for backing up databases, compressing files, and uploading to cloud storage.',
    'Design a system for automating code deployment with testing, versioning, and rollback capabilities.',
    'Develop automation for processing and organizing downloaded files based on type and content.',
    'Create scripts for automating social media post scheduling and analytics collection.',
    'Design automation for generating reports from multiple data sources and sending notifications.',
    'Develop a system for automating software license management and renewal processes.'
  ],
  'Database Operations': [
    'Design a database schema for a learning management system with courses, students, and assessments.',
    'Create database migration scripts for splitting a monolithic database into microservices.',
    'Develop stored procedures for complex reporting queries with performance optimization.',
    'Design a sharding strategy for a high-traffic database with data partitioning rules.',
    'Create a database backup and recovery system with point-in-time recovery capability.',
    'Develop a data archival solution with retention policies and retrieval mechanisms.'
  ],
  'ML Model Creation': [
    'Create a sentiment analysis model for customer support conversations with multi-language support.',
    'Design a recommendation system for products based on user behavior and preferences.',
    'Develop an image classification model for identifying product defects in manufacturing.',
    'Create a time series forecasting model for sales prediction with seasonal adjustments.',
    'Design a natural language processing model for text summarization and keyword extraction.',
    'Develop a clustering model for customer segmentation based on behavior patterns.'
  ],
  'Security Tools': [
    'Create a security scanning tool for identifying common vulnerabilities in web applications.',
    'Design a system for monitoring and alerting on suspicious login attempts and activities.',
    'Develop a tool for analyzing and reporting on security log patterns and anomalies.',
    'Create a password strength analyzer with policy enforcement and recommendations.',
    'Design a security audit tool for checking system configurations and compliance.',
    'Develop a tool for managing and rotating API keys and access credentials.'
  ],
  'Design Patterns': [
    'Implement a plugin system using the Strategy pattern for customizable data processing.',
    'Create a caching layer using the Decorator pattern with multiple cache strategies.',
    'Design an event handling system using the Observer pattern for loose coupling.',
    'Implement a resource pool using the Object Pool pattern for connection management.',
    'Create a command processing pipeline using the Chain of Responsibility pattern.',
    'Design a UI component library using the Composite pattern for nested elements.'
  ],
  'Performance Optimization': [
    'Optimize database queries for a high-traffic API with complex joins and filters.',
    'Create a caching strategy for reducing API calls and improving response times.',
    'Design a lazy loading system for large datasets with pagination and prefetching.',
    'Optimize image processing pipeline for handling large batches of uploads.',
    'Create a performance monitoring system with automated bottleneck detection.',
    'Design a resource pooling system for managing expensive connections.'
  ],
  'Error Handling': [
    'Design an error handling system for a distributed microservices architecture.',
    'Create a centralized error logging and monitoring solution with alerts.',
    'Develop a retry mechanism for handling transient failures in API calls.',
    'Design an error reporting system with detailed context and debugging information.',
    'Create a user-friendly error handling system for a public API.',
    'Develop a validation framework with comprehensive error messages and suggestions.'
  ]
};

export function ExamplePrompts({ area, onBack }: ExamplePromptsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">Example Prompts: {area}</h2>
      </div>
      
      <div className="grid gap-4">
        {EXAMPLE_PROMPTS[area]?.map((prompt, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-800 dark:text-gray-200">{prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}