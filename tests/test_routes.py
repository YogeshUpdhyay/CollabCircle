from fastapi.testclient import TestClient
from api import app

client = TestClient(app)

api_prefix = "api/v1/users"

def test_read_main():
    response = client.get(api_prefix + "/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}