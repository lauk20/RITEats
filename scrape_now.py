from bs4 import BeautifulSoup
import requests
import json

# Constants
URL = "https://www.rit.edu/fa/diningservices/"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

"""
Function that pulls the visiting chef data.
"""
def pull_data():
    results = soup.find_all("div", class_="hours open")
    locations = { };

    for location in results:
        #print(location.prettify())
        for hour in location:
            place = location.find("a", attrs={"data-toggle": "tooltip"})
            closes = place.get("title");
            locations[place.contents[0]] = closes
            #print(place.content)
        #locations.append(location)
        #print(location.prettify())

    return locations

def main():
    #print(chef_location_json);
    with open("./data/now_data.json", "w") as f:
        json.dump(pull_data(), f)

if __name__ == "__main__":
    main();