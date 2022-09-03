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
    results = soup.find_all("div", class_="col-xs-12 col-md-6 visitingchef-content")
    #print(results.prettify())

    chefs = [];
    locations = [];
    for res in results:
        chef_blocks = res.find_all("div", class_="visitingchef-event")
        location_blocks = res.find_all("div", class_="visitingchef-location")

        for chef_block in chef_blocks:
            chefs.append(chef_block)
            #print(chef_block.prettify())

        for location_block in location_blocks:
            locations.append(location_block)
            #print(location_block.prettify())

    chef_location = { };
    for i in range(len(chefs)):
        chef = chefs[i]
        location = locations[i]
        chef_location[chef.text.strip()] = location.text.strip();
        #chef_location.append((chef.text.strip(), location.text.strip()))

    return chef_location

def main():
    #print(chef_location_json);
    with open("./data/data.json", "w") as f:
        json.dump(pull_data(), f)

if __name__ == "__main__":
    main();