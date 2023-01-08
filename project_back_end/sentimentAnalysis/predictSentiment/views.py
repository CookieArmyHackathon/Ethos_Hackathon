from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from transformers import AutoTokenizer , TFAutoModelForSequenceClassification
from transformers import pipeline
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
    print(request.data)
    if request.data: 
        user_input = request.data
        # test_sample = tokenizer([user_input], padding=True, truncation=True, max_length=512,return_tensors='pt')
        # output = model(**test_sample)
        output=classifier(user_input)
        # y_pred = type(output)
        response = output
    return JsonResponse(response, safe=False)
