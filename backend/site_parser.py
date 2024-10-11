from bs4 import BeautifulSoup
import requests
def parse_site(url): 
    content = requests.get(url)
    soup = BeautifulSoup(content.text, 'html.parser')
    article = soup.find('article') or soup.find('main') or soup.find('section') or soup.find('div')
    text = ''
    if article:
       text = article.get_text(strip=True)
    return text
