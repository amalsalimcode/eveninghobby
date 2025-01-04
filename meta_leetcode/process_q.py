import json
import pandas as pd
from tabulate import tabulate

# Load the JSON data from the file
with open('q.json', 'r') as file:
    data = json.load(file)

# Extract the list of questions
questions = data['data']['favoriteQuestionList']['questions']

# Prepare data for DataFrame
rows = []
for index, question in enumerate(questions):
    lc_id = str(question.get('id', ''))
    title_slug = question.get('titleSlug', 'N/A')
    frequency = question.get('frequency', 'N/A')
    topic_tags = ', '.join(tag['name'] for tag in question.get('topicTags', []))
    # Create a hyperlink for the title
    title_link = f'<a href="https://leetcode.com/problems/{title_slug}">{title_slug}</a>'
    rows.append([index, title_link, frequency, topic_tags, lc_id])

# Create a DataFrame
df = pd.DataFrame(rows, columns=["Index", "Title-Slug", "Frequency", "Topic-Tags", "LC ID"])

# Convert DataFrame to HTML
html_table = df.to_html(escape=False, index=False)

# Print the HTML table
print(html_table)

