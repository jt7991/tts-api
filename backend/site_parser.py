from bs4 import BeautifulSoup
import requests
def parse_site(url): 
    content = requests.get(url)
    soup = BeautifulSoup(content.text, 'html.parser')
    article = soup.find('article')
    text = ''
    if article:
       text = article.get_text(strip=True)
    return text
