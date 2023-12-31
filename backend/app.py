from flask import Flask, render_template, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'  # SQLite database file
db = SQLAlchemy(app)

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(100), nullable=True)
    file_path = db.Column(db.String(100), nullable=False)

# Uncomment the following line during the initial setup to create the database table
# db.create_all()

# Replace this with your actual movie data
movies_data = {
    'Sixty-Five': {
        'description': 'Embark on a journey into the enigmatic world...',
        'image': 'sixty_five_xlg.jpg',
        'file_path': 'path/to/movies/Sixty-Five.mp4'
    },
    'Mission: Impossible - Dead Reckoning Part One': {
        'description': 'Immerse yourself in the adrenaline-pumping adventure...',
        'image': 'mission_impossible__dead_reckoning_part_one_ver2_xlg.jpg',
        'file_path': 'path/to/movies/Mission_Impossible_Dead_Reckoning_Part_One.mp4'
    },
    # Add more movies as needed
}

@app.route('/')
def index():
    return render_template('index.html', movies_data=movies_data)

@app.route('/download/<title>')
def download(title):
    movie_data = movies_data.get(title)

    if movie_data:
        file_path = movie_data['file_path']
        return send_from_directory('static/movies', file_path, as_attachment=True)

    return "Movie not found"

@app.route('/search', methods=['POST'])
def search():
    query = request.form.get('search_query')

    # Implement your search logic here (replace this with your actual logic)
    search_results = [movie for movie in movies_data.keys() if query.lower() in movie.lower()]

    return render_template('search_results.html', query=query, search_results=search_results)

if __name__ == '__main__':
    app.run(debug=True)
