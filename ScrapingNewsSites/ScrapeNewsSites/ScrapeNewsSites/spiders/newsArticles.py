import scrapy
from ..items import ScrapenewssitesItem


def joinSearchParameter(text):
    x = text.split(" ")
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
        parent_divs = response.css('div.NiLAwe')
        for articles in parent_divs:
            news_title = articles.css('div.xrnccd article h3.ipQwMb a.DY5T1d::text').extract()
            news_url = articles.css('div.xrnccd article h3.ipQwMb a.DY5T1d::attr(href)').extract()
            news_imageLink = articles.css(
            'div.NiLAwe a figure img::attr(src)').extract()
            items['news_title'] = news_title
            items['news_url'] = "https://news.google.com/"+ str(news_url[0])
            items['news_imageLink'] = news_imageLink
            yield items