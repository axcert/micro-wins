from setuptools import setup, find_packages

setup(
    name="project-app",
    version="1.0.0",
    description="Generated frontend_spa project",
    author="Your Name",
    author_email="your.email@example.com",
    packages=find_packages(),
    install_requires=[
        line.strip() 
        for line in open("requirements.txt").readlines() 
        if line.strip() and not line.startswith("#")
    ],
    python_requires=">=3.8",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
)