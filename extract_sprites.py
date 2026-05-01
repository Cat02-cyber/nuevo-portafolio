import urllib.request
import os
from PIL import Image

def download_image(url, filename):
    print(f"Downloading {url}...")
    urllib.request.urlretrieve(url, filename)

def crop_and_save(img, coords, name, output_dir):
    # coords is (left, top, right, bottom)
    cropped = img.crop(coords)
    out_path = os.path.join(output_dir, f"{name}.png")
    cropped.save(out_path)
    print(f"Saved {name}.png")

def main():
    url = "https://raw.githubusercontent.com/wayou/t-rex-runner/gh-pages/assets/default_100_percent/100-offline-sprite.png"
    sheet_filename = "100-offline-sprite.png"
    output_dir = r"c:\Users\lenovo\Documents\Nueva\public\dino-sprites"
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    download_image(url, sheet_filename)
    
    img = Image.open(sheet_filename).convert("RGBA")
    
    # 1. RESTART_BUTTON
    crop_and_save(img, (2, 2, 38, 34), "restart_button", output_dir)
    
    # 2. CLOUD
    crop_and_save(img, (86, 2, 132, 16), "cloud", output_dir)
    
    # 3. PTERODACTYL
    crop_and_save(img, (134, 2, 180, 42), "pterodactyl_1", output_dir)
    crop_and_save(img, (180, 2, 226, 42), "pterodactyl_2", output_dir)
    
    # 4. CACTUS_SMALL
    crop_and_save(img, (228, 2, 245, 37), "cactus_small_1", output_dir)
    crop_and_save(img, (245, 2, 262, 37), "cactus_small_2", output_dir)
    crop_and_save(img, (262, 2, 279, 37), "cactus_small_3", output_dir)
    crop_and_save(img, (279, 2, 296, 37), "cactus_small_4", output_dir)
    crop_and_save(img, (296, 2, 313, 37), "cactus_small_5", output_dir)
    crop_and_save(img, (313, 2, 330, 37), "cactus_small_6", output_dir)
    
    # 5. CACTUS_LARGE
    crop_and_save(img, (332, 2, 357, 52), "cactus_large_1", output_dir)
    crop_and_save(img, (357, 2, 382, 52), "cactus_large_2", output_dir)
    crop_and_save(img, (382, 2, 407, 52), "cactus_large_3", output_dir)
    crop_and_save(img, (407, 2, 432, 52), "cactus_large_4", output_dir)
    
    # 6. MOON
    crop_and_save(img, (624, 2, 644, 42), "moon_phase_0", output_dir)
    crop_and_save(img, (604, 2, 624, 42), "moon_phase_1", output_dir)
    crop_and_save(img, (584, 2, 604, 42), "moon_phase_2", output_dir)
    crop_and_save(img, (544, 2, 584, 42), "moon_phase_3", output_dir)
    crop_and_save(img, (524, 2, 544, 42), "moon_phase_4", output_dir)
    crop_and_save(img, (504, 2, 524, 42), "moon_phase_5", output_dir)
    crop_and_save(img, (484, 2, 504, 42), "moon_phase_6", output_dir)
    
    # 7. STAR
    crop_and_save(img, (645, 2, 654, 11), "star", output_dir)
    
    # 8. TEXT_SPRITE
    crop_and_save(img, (655, 15, 846, 26), "game_over_text", output_dir)
    for i in range(10):
        # 10 is the width, plus 2 for high score letters "HI" which are at 10 and 11
        crop_and_save(img, (655 + i*10, 2, 655 + (i+1)*10, 15), f"number_{i}", output_dir)
    crop_and_save(img, (655 + 10*10, 2, 655 + 12*10, 15), "hi_text", output_dir)
    
    # 9. TREX
    crop_and_save(img, (848, 2, 892, 49), "trex_jumping", output_dir)
    crop_and_save(img, (892, 2, 936, 49), "trex_waiting_1", output_dir)
    # Waiting 2 is just jumping frame based on index 0
    crop_and_save(img, (936, 2, 980, 49), "trex_running_1", output_dir)
    crop_and_save(img, (980, 2, 1024, 49), "trex_running_2", output_dir)
    crop_and_save(img, (1024, 2, 1068, 49), "trex_crashed_eyes_open", output_dir) # wait, what's 1024? 848 + 176? The crashed frame is 220 offset, so 848+220 = 1068
    crop_and_save(img, (1068, 2, 1112, 49), "trex_crashed", output_dir)
    crop_and_save(img, (1112, 2, 1171, 49), "trex_ducking_1", output_dir)
    crop_and_save(img, (1171, 2, 1230, 49), "trex_ducking_2", output_dir)
    
    # 10. HORIZON
    # We will just grab a big chunk of the bottom for the ground
    crop_and_save(img, (2, 54, 1202, 70), "horizon", output_dir)

if __name__ == '__main__':
    main()
