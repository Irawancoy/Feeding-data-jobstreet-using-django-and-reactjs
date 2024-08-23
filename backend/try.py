from bs4 import BeautifulSoup
import requests

# Set the headers and URL
# headers = {
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
# }
url = "https://www.jobstreet.co.id/id/job-search/jobs?keyword=data+scientist"

# Fetch the webpage content
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Find all job cards
jobs = soup.find_all('article', {'data-card-type': 'JobCard'})

# Iterate over the jobs and extract data
for job in jobs:
    try:
        # Get the job title
        title_elem = job.find('a', {'data-automation': 'jobTitle'})
        title = title_elem.text if title_elem else "No title available"

        # Get the company name
        company_elem = job.find('a', {'data-automation': 'jobCompany'})
        company = company_elem.text if company_elem else "No company available"

        # Get the job location
        location_elem = job.find('span', {'data-automation': 'jobCardLocation'})
        location = location_elem.text if location_elem else "No location available"

       # Get the salary
        salary_elem = job.find('span', {'data-automation': 'jobSalary'})
        salary = salary_elem.text if salary_elem else "No salary available"

        # Get the work type
        work_elem = job.find('span', {'data-automation': 'workType'})
        work = work_elem.text if work_elem else "No work type available"

        # Get the job listing date
        date_elem = job.find('span', {'data-automation': 'jobListingDate'})
        listing_date = date_elem.text if date_elem else "No listing date available"

        # Print the extracted data
        print(f"Job Title: {title}")
        print(f"Company: {company}")
        print(f"Location: {location}")
        print(f"Salary: {salary}")
        print(f"Work Type: {work}")
        print(f"Listing Date: {listing_date}")
        print("-" * 40)

    except Exception as e:
        print(f"Error processing job: {e}")
