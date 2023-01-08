# 
from fastapi import FastAPI,Request
# from pydantic import BaseModel
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from transformers import AutoTokenizer , TFAutoModelForSequenceClassification
from transformers import pipeline
import torch
 
app = FastAPI()
app.add_middleware(
    TrustedHostMiddleware, allowed_hosts=["*"] 
)
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/hello")
def read_root():
    return {"Hello": "Hello"}

def get_model():
    model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
    model = TFAutoModelForSequenceClassification.from_pretrained(model_name,from_pt=True )
    tokenizer=AutoTokenizer.from_pretrained(model_name)
    classifier=pipeline('sentiment-analysis',model=model,tokenizer=tokenizer)    
    return  classifier
 
    
classifier = get_model()

@app.post("/predict")
async def read_root(request: Request):
    print(request.json())
    data = await request.json() 
    print(data)
    if 'text' in data:
        user_input = data['text']
        # test_sample = tokenizer([user_input], padding=True, truncation=True, max_length=512,return_tensors='pt')
        # output = model(**test_sample)
        output=classifier(user_input)
        # y_pred = type(output)
        response = output[0]['label']
    else:
        response ="Nothing"
    return response

if __name__ == "__main__":
    uvicorn.run("main:app",host='127.0.0.1', port=8080, reload=True)