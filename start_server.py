#!/usr/bin/env python3
"""
Kill any process on ports 3000/3001 and start both Next.js dev servers.
Run this script from anywhere - it will cd to the correct directories.
"""

import subprocess
import os
import time

# Paths to the projects
MAIN_DIR = "/Users/asherzaczepinski/Desktop/Code With Asher"
STDDEV_DIR = os.path.join(MAIN_DIR, "codewithasher-stddev")

def kill_port(port):
    """Kill any process running on the specified port."""
    try:
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
            time.sleep(1)
        else:
            print(f"No process found on port {port}")

    except Exception as e:
        print(f"Error killing port {port}: {e}")

def start_servers():
    """Start both Next.js dev servers."""
    print(f"\nStarting main server in: {MAIN_DIR}")
    print("Main server: http://localhost:3000")
    print(f"\nStarting stddev server in: {STDDEV_DIR}")
    print("Stddev server: http://localhost:3001\n")

    # Start stddev server in background (port 3001)
    stddev_proc = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=STDDEV_DIR
    )

    # Start main server in foreground (port 3000)
    try:
        os.chdir(MAIN_DIR)
        subprocess.run(["npm", "run", "dev"])
    finally:
        stddev_proc.terminate()

if __name__ == "__main__":
    print("=== Neural Network Tutorial Server Starter ===\n")

    kill_port(3000)
    kill_port(3001)

    start_servers()
