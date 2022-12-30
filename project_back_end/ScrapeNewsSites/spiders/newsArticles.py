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

a=False
class NewsarticlesSpider(scrapy.Spider):
    searchParameter = joinSearchParameter('christiano ronaldo')
    name = 'newsArticles'
    allowed_domains = ['news.google.com']
    start_urls = [
        f'https://news.google.com/search?q={searchParameter}&hl=en-IN&gl=IN&ceid=IN%3Aen'
    ]

    def parse(self, response):
        items = ScrapenewssitesItem()
        parent_divs = response.css('div.NiLAwe')
        for articles in parent_divs:
            news_title = articles.css('div.xrnccd article h3.ipQwMb a.DY5T1d::text').extract()
            news_url = articles.css('div.xrnccd article h3.ipQwMb a.DY5T1d::attr(href)').extract()
            news_imageLink = articles.css(
            'div.NiLAwe a figure img::attr(src)').extract()
            items['a_news_title'] = news_title
            items['b_news_url'] = "https://news.google.com/"+ str(news_url[0])
            items['c_news_imageLink'] = news_imageLink
            yield items
        # news_title = response.css('div.xrnccd article h3.ipQwMb a.DY5T1d::text').extract()
            # print(news_title)
        # news_url = response.css('div.xrnccd article h3.ipQwMb a.DY5T1d::attr(href)').extract()
        # news_imageLink = response.css(
        # 'div.NiLAwe a figure img::attr(src)').extract()
        # items['a_news_title'] = news_title
        # items['b_news_url'] = news_url
        # items['c_news_imageLink'] = news_imageLink
        # print (items)
        # yield items


# print(a)
process=CrawlerProcess()
process.crawl(NewsarticlesSpider)
process.start()