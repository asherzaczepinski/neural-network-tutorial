#!/usr/bin/env python3
"""
Kill any process on port 3000 and start the Next.js dev server.
Run this script from anywhere - it will cd to the correct directory.
"""

import subprocess
import os
import time

# Path to the project
PROJECT_DIR = "/Users/asherzaczepinski/Desktop/Code With Asher"

def kill_port(port):
    """Kill any process running on the specified port."""
    try:
        # Find process on port
        result = subprocess.run(
            ["lsof", "-ti", f":{port}"],
            capture_output=True,
            text=True
        )
        pids = result.stdout.strip().split('\n')

        for pid in pids:
            if pid:
                print(f"Killing process {pid} on port {port}")
                subprocess.run(["kill", "-9", pid])

        if pids and pids[0]:
            print(f"Killed processes on port {port}")
            time.sleep(1)  # Wait for port to be released
        else:
            print(f"No process found on port {port}")

    except Exception as e:
        print(f"Error killing port {port}: {e}")

def start_server():
    """Start the Next.js dev server."""
    print(f"\nStarting server in: {PROJECT_DIR}")
    print("Server will be available at: http://localhost:3000\n")

    os.chdir(PROJECT_DIR)

    # Start the dev server (this will keep running)
    subprocess.run(["npm", "run", "dev"])

if __name__ == "__main__":
    print("=== Neural Network Tutorial Server Starter ===\n")

    # Kill anything on port 3000
    kill_port(3000)

    # Start the server
    start_server()
