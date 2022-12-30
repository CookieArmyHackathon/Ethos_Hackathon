import scrapy
from items import ScrapenewssitesItem
import sys
from scrapy.crawler import CrawlerProcess

def joinSearchParameter(text):
    x = text.split(" ")
    delim = "%20"
    temp = list(map(str, x))
    res = delim.join(temp)
    return str(res)

class NewsarticlesSpider(scrapy.Spider):
    searchParameter = joinSearchParameter(sys.argv[1])
    name = 'newsArticles'
    allowed_domains = ['news.google.com']
    start_urls = [
        f'https://news.google.com/search?q={searchParameter}&hl=en-IN&gl=IN&ceid=IN%3Aen'
    ]

    def parse(self, response):
        items = ScrapenewssitesItem()
        parent_divs = response.css('div.NiLAwe')
        count=0
        for articles in parent_divs:
            news_title = articles.css('div.xrnccd article h3.ipQwMb a.DY5T1d::text').extract_first()
            news_url = articles.css('div.xrnccd article h3.ipQwMb a.DY5T1d::attr(href)').extract_first()
            news_imageLink = articles.css(
            'div.NiLAwe a figure img::attr(src)').extract_first()
            items['a_news_title'] = news_title
            items['b_news_url'] = news_url
            items['c_news_imageLink'] = news_imageLink
            count+=1
            items['count']=count
            yield items
# print(a)
process=CrawlerProcess()
process.crawl(NewsarticlesSpider)
process.start()