import requests
from bs4 import BeautifulSoup
import json
import re
import math
from datetime import datetime

keyword = "java spring"  # Kata kunci pencarian
data_per_page = 32  # Jumlah data per halaman
total_jobs = []

# Fungsi untuk mengambil dan mem-parsing halaman
def fetch_page_data(page):
    url = f"https://id.jobstreet.com/id/{keyword}-jobs?page={page}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        script = soup.find('script', text=re.compile('window.SEEK_REDUX_DATA'))
        if script:
            json_text = re.search(r'window\.SEEK_REDUX_DATA\s*=\s*(\{.*\});', script.string).group(1)
            return json.loads(json_text)
    except (requests.exceptions.RequestException, AttributeError, json.JSONDecodeError):
        return None

# Ambil total data dan hitung max_pages
data = fetch_page_data(1)
if data:
    total_data = int(data['results']['results']['summary']['displayTotalCount'].replace(",", ""))
    max_pages = math.ceil(total_data / data_per_page)
    print(f"Total Data: {total_data}, Max Pages: {max_pages}")
else:
    print("Failed to fetch data.")
    exit()

# Looping untuk mengambil data dari semua halaman
for page in range(1, max_pages + 1):
    print(f"Fetching data from page {page}...")
    data = fetch_page_data(page)
    if data:
        jobs = data['results']['results']['jobs']
        total_jobs.extend(jobs)
        print(f"Jobs found on page {page}: {len(jobs)}")

# Tampilkan informasi pekerjaan
# Tampilkan informasi pekerjaan
print(f"\nTotal Jobs collected: {len(total_jobs)}")
for job in total_jobs:
    title = job.get('title', 'No Title')
    company_name = job.get('advertiser', {}).get('description', 'No Company Name')
    location = job.get('location', 'No Location')
    listing_date = job.get('listingDate', 'No Listing Date')
    salary = job.get('salary', 'No Salary')
    work_type = job.get('workType', 'No Work Type')

    # Format listing_date
    if listing_date != 'No Listing Date':
        try:
            listing_date_obj = datetime.strptime(listing_date, "%Y-%m-%dT%H:%M:%SZ")
            formatted_date = listing_date_obj.strftime("%Y-%m-%d")
        except ValueError:
            formatted_date = 'Invalid Date Format'
    else:
        formatted_date = 'No Listing Date'

    print('-' * 50)
    print(f"Title: {title}")
    print(f"Company Name: {company_name}")
    print(f"Location: {location}")
    print(f"Listing Date: {formatted_date}")
    print(f"Salary: {salary}")
    print(f"Work Type: {work_type}")
    print(f"Keyword: {keyword}")
