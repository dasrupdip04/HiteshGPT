from pytube import YouTube


from moviepy import VideoFileClip






# Download video
yt = YouTube("https://www.youtube.com/watch?v=bbn6feSeUjI")
stream = yt.streams.filter(only_audio=True).first()
download_path = stream.download(filename="audio.mp4")

# Extract audio
clip = VideoFileClip(download_path)
clip.audio.write_audiofile("audio.wav")

import whisper

model = whisper.load_model("medium")  # or "large" for better accuracy
result = model.transcribe("audio.wav", language="hi")
print(result["text"])
