
import os
import re

# Configuration
ASSETS_DIR = 'assets'
INDEX_FILE = 'index.html'

def main():
    # 1. Build mapping from "expected cdn filename" to "actual local path"
    print("Building asset mapping...")
    asset_mapping = {}
    
    # List files in assets directory
    try:
        files = os.listdir(ASSETS_DIR)
    except FileNotFoundError:
        print(f"Error: {ASSETS_DIR} directory not found.")
        return

    for filename in files:
        # Ignore hidden files
        if filename.startswith('.'):
            continue
            
        local_path = f"{ASSETS_DIR}/{filename}"
        
        # Strategy: 
        # 1. Exact match
        # 2. Stripped "imgi_N_" prefix match
        
        asset_mapping[filename] = local_path
        
        # Regex to strip "imgi_N_" prefix
        match = re.search(r'^imgi_\d+_(.+)$', filename)
        if match:
            clean_name = match.group(1)
            asset_mapping[clean_name] = local_path
            
    print(f"Mapped {len(asset_mapping)} asset keys.")

    # 2. Read index.html
    try:
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {INDEX_FILE} not found.")
        return

    # 3. Find and Replace URLs
    # Corrected Regex:
    # Matches http://, https://, or // start.
    # We use (?:https?:)?// to match the protocol and slashes.
    # Enclose in group 0 implicitly or use finditer.
    
    url_pattern = re.compile(r'((?:https?:)?//(?:[\w\-\.]+\/)+)([\w\-\.%]+(?:\.[a-zA-Z0-9]+)?)(?:\?v=\d+)?')
    
    def replace_match(match):
        full_url = match.group(0)
        filename = match.group(2)
        
        # Strip query param if caught in filename
        if '?' in filename:
            filename = filename.split('?')[0]
            
        if filename in asset_mapping:
            print(f"Replacing: {filename} -> {asset_mapping[filename]}")
            return asset_mapping[filename]
            
        # Try URL decoding
        try:
            from urllib.parse import unquote
            decoded = unquote(filename)
            if decoded in asset_mapping:
                print(f"Replacing (decoded): {decoded} -> {asset_mapping[decoded]}")
                return asset_mapping[decoded]
        except:
            pass
            
        return full_url

    new_content = url_pattern.sub(replace_match, content)

    # 4. Write back
    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Done replaced links.")

if __name__ == '__main__':
    main()
