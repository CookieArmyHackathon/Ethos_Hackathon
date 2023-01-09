from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from transformers import AutoTokenizer , TFAutoModelForSequenceClassification
from transformers import pipeline
import json
# Create your views here.

def get_model():
    model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
    model = TFAutoModelForSequenceClassification.from_pretrained(model_name,from_pt=True )
    tokenizer=AutoTokenizer.from_pretrained(model_name)
    classifier=pipeline('sentiment-analysis',model=model,tokenizer=tokenizer)    
    return  classifier     
classifier = get_model()

@api_view(['POST'])
def transcript(request):
    # print(request.data)
    if request.data: 
        user_input = json.loads(request.data)
        print(user_input)
        # test_sample = tokenizer([user_input], padding=True, truncation=True, max_length=512,return_tensors='pt')
        # output = model(**test_sample)
        # output=[]
        # for article in request.data:
            # output_segment=classifier(article['NewsHeading'])['label']
            # full_output={
            #     "title":article['NewsHeading'],
            #     "newsLink":article['NewsLink'],
            #     "imageLink":article['NewsImageLink'],
            #     "sentiment":output_segment
            # }
            # output.append(full_output)
            # output_segment 
        # y_pred = type(output)
    return JsonResponse(request.data, safe=False)
