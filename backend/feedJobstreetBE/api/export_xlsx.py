from openpyxl import Workbook
import io

def export_jobs_to_xlsx(jobs_data, keyword):
    output = io.BytesIO()
    workbook = Workbook()
    worksheet = workbook.active
    worksheet.title = 'Jobs'

    # Tambahkan header
    headers = ['ID', 'Title', 'Company Name', 'Work Type', 'Location', 'Salary', 'Listing Date', 'Keyword']
    worksheet.append(headers)

    # Tambahkan data
    for job in jobs_data:
        worksheet.append([
            job['id'],
            job['title'],
            job['company_name'],
            job['work_type'],
            job['location'],
            job['salary'],
            job['listing_date'],
            job['keyword']
        ])

    # Simpan workbook ke BytesIO
    workbook.save(output)
    output.seek(0)

    # Kembalikan objek BytesIO dan filename
    keyword = keyword if keyword else 'all'
    filename = f'jobs_{keyword}.xlsx'
    return output, filename
