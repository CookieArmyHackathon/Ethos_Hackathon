import scrapy
from ..items import ScrapenewssitesItem

def joinSearchParameter(text):
    x = text.split(" ")
    print(x)
    delim = "%20"
    temp = list(map(str, x))
    res = delim.join(temp)
    return str(res)
class NewsarticlesSpider(scrapy.Spider):
    searchParameter = joinSearchParameter("xyz")
    name = 'newsArticles'
    allowed_domains = ['news.google.com']
    start_urls = [
        f'https://news.google.com/search?q={searchParameter}&hl=en-IN&gl=IN&ceid=IN%3Aen'
    ]

    def parse(self, response):
        print(NewsarticlesSpider.searchParameter)
        items = ScrapenewssitesItem()
        name = response.css('a.DY5T1d::text').extract()
        items['name'] = name
        yield items