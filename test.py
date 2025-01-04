import requests
import re
import urllib.parse
import webbrowser

def search_jobs(query, ats_tracker, num_results=10):
    # Construct the Google search URL
    search_query = f"{query} site:{ats_tracker}"
    encoded_query = urllib.parse.quote(search_query)
    url = f"https://www.google.com/search?q={encoded_query}&num={num_results}"

    # Perform the search
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"}
    response = requests.get(url, headers=headers)
    
    # Extract URLs using regular expressions
    urls = re.findall(r'(https?://\S+)', response.text)
    
    return urls

# Example usage
if __name__ == "__main__":
    query = "Senior Software Developer"
    ats_tracker = "greenhouse.io"
    results = search_jobs(query, ats_tracker)

    print("Search results:")
    for result in results:
        print(result)
        webbrowser.open(result)

