# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class ScrapenewssitesItem(scrapy.Item):
    # define the fields for your item here like:
    news_title = scrapy.Field()
    news_url = scrapy.Field()
    news_imageLink = scrapy.Field()
    # name = scrapy.Field()
    pass