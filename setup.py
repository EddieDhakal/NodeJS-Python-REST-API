from setuptools import setup


requires = [
    'behave',   # For testing API features from an end user perspective
    'requests'  # For testing end to end HTTP API calls
]

setup(
    name='API Test',
    description='End to end HTTP API tests',
    install_requires=requires
)
