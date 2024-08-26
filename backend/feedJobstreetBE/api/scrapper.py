import requests
from bs4 import BeautifulSoup
import json
import re
import math
from datetime import datetime
from .models import Jobs

data_per_page = 32  # Jumlah data per halaman

def fetch_page_data(page, keyword):
    url = f"https://id.jobstreet.com/id/{keyword}-jobs?page={page}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        script = soup.find('script', text=re.compile('window.SEEK_REDUX_DATA'))
        if script:
            json_text = re.search(r'window\.SEEK_REDUX_DATA\s*=\s*(\{.*\});', script.string).group(1)
            return json.loads(json_text)
    except (RequestException, AttributeError, json.JSONDecodeError):
        return None

def scrape_jobs(keyword):
    total_jobs = []
    # Ambil total data dan hitung max_pages
    data = fetch_page_data(1, keyword)
    if data:
        total_data = int(data['results']['results']['summary']['displayTotalCount'].replace(",", ""))
        max_pages = math.ceil(total_data / data_per_page)
    else:
        return []

    # Looping untuk mengambil data dari semua halaman
    for page in range(1, max_pages + 1):
        data = fetch_page_data(page, keyword)
        if data:
            jobs = data['results']['results']['jobs']
            for job in jobs:
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

                # Simpan data ke database
                Jobs.objects.update_or_create(
                    title=title,
                    company_name=company_name,
                    keyword=keyword,  
                    defaults={
                        'work_type': work_type,
                        'location': location,
                        'salary': salary,
                        'listing_date': formatted_date
                    }
                )
                total_jobs.append({
                    'title': title,
                    'company_name': company_name,
                    'location': location,
                    'listing_date': formatted_date,
                    'salary': salary,
                    'work_type': work_type,
                })
    return total_jobs
