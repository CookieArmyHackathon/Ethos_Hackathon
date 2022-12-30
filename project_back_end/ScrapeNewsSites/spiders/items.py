# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ScrapenewssitesItem(scrapy.Item):
    # define the fields for your item here like:
    a_news_title = scrapy.Field()
    b_news_url = scrapy.Field()
    c_news_imageLink = scrapy.Field()
    # name = scrapy.Field()
    pass
