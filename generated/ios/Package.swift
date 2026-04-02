// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "BdGeoLocation",
    platforms: [
        .iOS(.v13),
        .macOS(.v10_15),
    ],
    products: [
        .library(
            name: "BdGeoLocation",
            targets: ["BdGeoLocation"]),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "BdGeoLocation",
            dependencies: [],
            path: "Sources/BdGeoLocation"),
        .testTarget(
            name: "BdGeoLocationTests",
            dependencies: ["BdGeoLocation"]),
    ]
)
