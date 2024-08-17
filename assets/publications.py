
# coding: utf-8

# # Publications markdown generator for academicpages
# 
# Takes a TSV of publications with metadata and converts them for use with [academicpages.github.io](academicpages.github.io). This is an interactive Jupyter notebook, with the core python code in publications.py. Run either from the `markdown_generator` folder after replacing `publications.tsv` with one that fits your format.
# 
# TODO: Make this work with BibTex and other databases of citations, rather than Stuart's non-standard TSV format and citation style.
# 

# ## Data format
# 
# The TSV needs to have the following columns: pub_date, title, venue, excerpt, citation, site_url, and paper_url, with a header at the top. 
# 
# - `excerpt` and `paper_url` can be blank, but the others must have values. 
# - `date` must be formatted as YYYY-MM-DD.
# - `permalink` will be the descriptive part of the .md file and the permalink URL for the page about the paper. The .md file will be `YYYY-MM-DD-[url_slug].md` and the permalink will be `https://[yourdomain]/publications/YYYY-MM-DD-[url_slug]`


# ## Import pandas
# 
# We are using the very handy pandas library for dataframes.

# In[2]:

import json


# ## Import TSV
# 
# Pandas makes this easy with the read_csv function. We are using a TSV, so we specify the separator as a tab, or `\t`.
# 
# I found it important to put this data in a tab-separated values format, because there are a lot of commas in this kind of data and comma-separated values can get messed up. However, you can modify the import statement, as pandas also has read_excel(), read_json(), and others.

# In[3]:

# publications = pd.read_csv("publications.tsv", sep="\t", header=0)
with open("publications.json") as f:
    publications = json.load(f)
    assert publications["collection"] == "publications"

    venues = dict(publications["venues"])

    for pub in publications["data"]:

        pub["_permalink"] = pub["permalink"]
        pub["permalink"] = "/publication/" + pub["permalink"]

        pub["collection"] = "publications"

        # translate venues
        if pub["venue"][0] == "@":
            pub["venue"] = venues[pub["venue"][1:]]

        # add other preprocessing items
        if "teaser" in pub:
            pub["teaser"] = "pubs/" + pub["teaser"]
        if "preview" in pub:
            pub["preview"] = "pubs/" + pub["preview"]

# ## Escape special characters
# 
# YAML is very picky about how it takes a valid string, so we are replacing single and double quotes (and ampersands) with their HTML encoded equivilents. This makes them look not so readable in raw format, but they are parsed and rendered nicely.

# In[4]:

html_escape_table = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;"
    }

def html_escape(text):
    """Produce entities within text."""
    return "".join(html_escape_table.get(c,c) for c in text)


# ## Creating the markdown files
# 
# This is where the heavy lifting is done. This loops through all the rows in the TSV dataframe, then starts to concatentate a big string (```md```) that contains the markdown for each type. It does the YAML metadata first, then does the description for the individual page. If you don't want something to appear (like the "Recommended citation")

# In[5]:

def gen_header(data):
    outputs = []
    for key, value in data.items():
        if key == "date":
            outputs.append(f"{key}: {value}")
        else:
            outputs.append(f"{key}: \"{value}\"")
    return "\n".join(outputs)

import os
for pub in publications["data"]:

    filename = str(pub["_permalink"]) + ".md"
    year = pub["date"][:4]

    del pub["_permalink"]

    # teaser = ""
    # if "teaser" in pub:
    #     teaser += "<figure>"
    #     teaser += f"<img src=\"/images/{pub['teaser']}\" alt=\"image\">"
    #     if "teaser_caption" in pub:
    #         teaser += f"<figcaption align = \"center\">{pub['teaser_caption']}</figcaption>"
    #         del pub["teaser_caption"]
    #     teaser += "</figure>\n"
    #     del pub["teaser"]

    ## YAML variables
    md = f"---\n{gen_header(pub)}\n---\n"

    # md += "\n" + teaser

    if os.path.isfile("pubs/" + filename):
        with open("pubs/" + filename, 'r') as template:
            md += template.read()
    else:
        print(f"markdown file pubs/{filename} not found.")

    filename = os.path.basename(filename)
       
    with open("../_publications/" + filename, 'w') as f:
        f.write(md)
