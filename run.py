import uvicorn

if __name__ == "__main__":
    # uvicorn.run("api:app", reload=True, debug=True)
    uvicorn.run("api:app", reload=True, host="0.0.0.0", debug=True)