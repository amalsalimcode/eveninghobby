import json
import pandas as pd
import webbrowser

# Load the JSON data from the file
with open('q.json', 'r') as file:
    data = json.load(file)

# Extract the list of questions
questions = data['data']['favoriteQuestionList']['questions']

# Prepare data for DataFrame
rows = []
for index, question in enumerate(questions):
    q_id = question.get('id', 'N/A')
    title_slug = question.get('titleSlug', 'N/A')
    frequency = question.get('frequency', 'N/A')
    topic_tags = ', '.join(tag['name'] for tag in question.get('topicTags', []))
    # Create a hyperlink for the title
    title_link = f'<a href="https://leetcode.com/problems/{title_slug}">{title_slug}</a>'
    rows.append([q_id, index, title_slug, title_link, frequency, topic_tags])

# Create a DataFrame
df = pd.DataFrame(rows, columns=["Q ID", "Index", "Title Slug", "Title-Slug", "Frequency", "Topic-Tags"])

# Convert DataFrame to HTML
html_table = df.to_html(escape=False, index=False)

# Print the HTML table (optional, for visualization)
print(html_table)

# Open links for rows 150 to 200
for i in range(199, 250):
    if i < len(df):
        title_slug = df.at[i, 'Title-Slug']
        # Extract the actual URL from the HTML link
        url = title_slug.split('"')[1]
        #webbrowser.open(url)

        q_id = df.at[i, 'Q ID']
        title_slug_nourl = df.at[i, 'Title Slug']
        print(q_id)

