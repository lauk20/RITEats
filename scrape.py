from bs4 import BeautifulSoup
import requests

# Constants
URL = "https://www.rit.edu/fa/diningservices/"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

"""
Function that pulls the 
"""
def pull_data():
    results = soup.find("div", class_="col-xs-12 col-md-6 visitingchef-content")
    #print(results.prettify())

    chef_blocks = results.find_all("div", class_="visitingchef-event")
    location_blocks = results.find_all("div", class_="visitingchef-location")

    chefs = [];
    locations = [];

    for chef_block in chef_blocks:
        chefs.append(chef_block)
        #print(chef_block.prettify())

    for location_block in location_blocks:
        locations.append(location_block)
        #print(location_block.prettify())

    chef_location = [];
    for i in range(len(chefs)):
        chef = chefs[i]
        location = locations[i]
        chef_location.append((chef.text.strip(), location.text.strip()))

    return chef_location

def main():
    return pull_data()

if __name__ == "__main__":
    main();